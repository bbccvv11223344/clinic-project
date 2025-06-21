import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResultDto, UpdateResultDto } from './dto/result.dto';

@Injectable()
export class ResultsService {
  constructor(private prisma: PrismaService) {}

  async createResult(userId: string, createResultDto: CreateResultDto) {
    const { title, description, beforeImage, afterImage, procedure, isPublic } = createResultDto;

    return this.prisma.beforeAfterResult.create({
      data: {
        userId,
        title,
        description,
        beforeImage,
        afterImage,
        procedure,
        isPublic: isPublic || false,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async getPublicResults() {
    return this.prisma.beforeAfterResult.findMany({
      where: {
        isPublic: true,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getUserResults(userId: string) {
    return this.prisma.beforeAfterResult.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAllResults() {
    return this.prisma.beforeAfterResult.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getResultById(id: string) {
    return this.prisma.beforeAfterResult.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async updateResult(id: string, userId: string, updateResultDto: UpdateResultDto) {
    // Verify ownership
    const result = await this.prisma.beforeAfterResult.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!result) {
      throw new Error('Result not found or access denied');
    }

    return this.prisma.beforeAfterResult.update({
      where: { id },
      data: updateResultDto,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async deleteResult(id: string, userId: string) {
    // Verify ownership
    const result = await this.prisma.beforeAfterResult.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!result) {
      throw new Error('Result not found or access denied');
    }

    return this.prisma.beforeAfterResult.delete({
      where: { id },
    });
  }

  async getResultsByProcedure(procedure: string) {
    return this.prisma.beforeAfterResult.findMany({
      where: {
        procedure,
        isPublic: true,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

