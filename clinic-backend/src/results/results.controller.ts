import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  UseGuards, 
  Request,
  Put,
  Delete,
  Query
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto, UpdateResultDto } from './dto/result.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get('public')
  async getPublicResults() {
    return this.resultsService.getPublicResults();
  }

  @Get('procedure/:procedure')
  async getResultsByProcedure(@Param('procedure') procedure: string) {
    return this.resultsService.getResultsByProcedure(procedure);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createResult(
    @Request() req,
    @Body() createResultDto: CreateResultDto,
  ) {
    return this.resultsService.createResult(req.user.id, createResultDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getUserResults(@Request() req) {
    return this.resultsService.getUserResults(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.MEDICAL_STAFF)
  @Get('all')
  async getAllResults() {
    return this.resultsService.getAllResults();
  }

  @Get(':id')
  async getResult(@Param('id') id: string) {
    return this.resultsService.getResultById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateResult(
    @Param('id') id: string,
    @Request() req,
    @Body() updateResultDto: UpdateResultDto,
  ) {
    return this.resultsService.updateResult(id, req.user.id, updateResultDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteResult(@Param('id') id: string, @Request() req) {
    return this.resultsService.deleteResult(id, req.user.id);
  }
}

