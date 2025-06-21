import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  UseGuards, 
  Request,
  Patch
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto, CreateMessageDto } from './dto/consultation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConsultationStatus } from '@prisma/client';

@Controller('consultations')
@UseGuards(JwtAuthGuard)
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  async createConsultation(
    @Request() req,
    @Body() createConsultationDto: CreateConsultationDto,
  ) {
    return this.consultationsService.createConsultation(
      req.user.id,
      createConsultationDto,
    );
  }

  @Get()
  async getUserConsultations(@Request() req) {
    return this.consultationsService.getUserConsultations(req.user.id);
  }

  @Get('doctors')
  async getDoctors() {
    return this.consultationsService.getDoctors();
  }

  @Get(':id')
  async getConsultation(@Param('id') id: string, @Request() req) {
    return this.consultationsService.getConsultationById(id, req.user.id);
  }

  @Post(':id/messages')
  async addMessage(
    @Param('id') consultationId: string,
    @Request() req,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.consultationsService.addMessage(
      consultationId,
      req.user.id,
      createMessageDto,
    );
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') consultationId: string,
    @Request() req,
    @Body('status') status: ConsultationStatus,
  ) {
    return this.consultationsService.updateConsultationStatus(
      consultationId,
      req.user.id,
      status,
    );
  }
}

