import { IsString, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateResultDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUrl()
  beforeImage: string;

  @IsUrl()
  afterImage: string;

  @IsString()
  procedure: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

export class UpdateResultDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  beforeImage?: string;

  @IsOptional()
  @IsUrl()
  afterImage?: string;

  @IsOptional()
  @IsString()
  procedure?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

