import { IsString, IsOptional, IsArray, IsUUID } from 'class-validator';

export class CreateConsultationDto {
  @IsUUID()
  doctorId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateMessageDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
}

