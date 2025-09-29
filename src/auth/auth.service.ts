import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

  // Signup method with custom error handling
  async signup(name: string, email: string, password: string) {
    try {
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return {
          success: false,
          message: 'This email is already registered, please login instead',
        };
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await this.prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      return {
        success: true,
        message: 'Signup successful',
        userId: user.id,
      };
    } catch (err) {
      console.error('Signup error:', err);
      throw new InternalServerErrorException('Something went wrong during signup');
    }
  }

  // Login method with proper error handling
  async login(email: string, password: string) {
    try {
      // Find the user by email
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        return { success: false, message: 'Invalid email or password' };
      }

      // Compare passwords
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return { success: false, message: 'Invalid email or password' };
      }

      // Generate JWT token
      const token = this.jwtService.sign({ sub: user.id, email: user.email });

      return {
        success: true,
        message: 'Login successful',
        access_token: token,
      };
    } catch (err) {
      console.error('Login error:', err);
      throw new InternalServerErrorException('Something went wrong during login');
    }
  }
}
