import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConsultationDto, CreateMessageDto } from './dto/consultation.dto';
import { ConsultationStatus } from '@prisma/client';

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  async createConsultation(userId: string, createConsultationDto: CreateConsultationDto) {
    const { doctorId, title, description } = createConsultationDto;

    return this.prisma.consultation.create({
      data: {
        userId,
        doctorId,
        title,
        description,
        status: ConsultationStatus.ACTIVE,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async getUserConsultations(userId: string) {
    return this.prisma.consultation.findMany({
      where: {
        OR: [
          { userId },
          { doctorId: userId },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async getConsultationById(consultationId: string, userId: string) {
    const consultation = await this.prisma.consultation.findFirst({
      where: {
        id: consultationId,
        OR: [
          { userId },
          { doctorId: userId },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!consultation) {
      throw new Error('Consultation not found');
    }

    return consultation;
  }

  async addMessage(consultationId: string, senderId: string, createMessageDto: CreateMessageDto) {
    const { message, attachments } = createMessageDto;

    // Verify user has access to this consultation
    const consultation = await this.prisma.consultation.findFirst({
      where: {
        id: consultationId,
        OR: [
          { userId: senderId },
          { doctorId: senderId },
        ],
      },
    });

    if (!consultation) {
      throw new Error('Consultation not found or access denied');
    }

    // Create message
    const newMessage = await this.prisma.consultationMessage.create({
      data: {
        consultationId,
        senderId,
        message,
        attachments: attachments || [],
      },
    });

    // Update consultation timestamp
    await this.prisma.consultation.update({
      where: { id: consultationId },
      data: { updatedAt: new Date() },
    });

    return newMessage;
  }

  async updateConsultationStatus(consultationId: string, userId: string, status: ConsultationStatus) {
    // Verify user has access to this consultation
    const consultation = await this.prisma.consultation.findFirst({
      where: {
        id: consultationId,
        OR: [
          { userId },
          { doctorId: userId },
        ],
      },
    });

    if (!consultation) {
      throw new Error('Consultation not found or access denied');
    }

    return this.prisma.consultation.update({
      where: { id: consultationId },
      data: { status },
    });
  }

  async getDoctors() {
    return this.prisma.user.findMany({
      where: {
        role: {
          in: ['DOCTOR', 'MEDICAL_STAFF'],
        },
        isActive: true,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
      },
    });
  }
}

