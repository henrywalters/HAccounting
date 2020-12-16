import { Delete, HttpCode, Param, Post, Put, Res } from "@nestjs/common";
import { Header } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { PDFService } from "@t00nday/nestjs-pdf";
import { ProjectDto } from "src/dtos/project.dto";
import { Client } from "src/entities/client.entity";
import { Project } from "src/entities/project.entity";
import { ProjectTask } from "src/entities/projectTask.entity";
import * as fsPromise from 'fs/promises';
import { createReadStream } from "fs";
import { Response } from "express";

@Controller("v1/projects")
export class ProjectController {

    constructor(private readonly pdfService: PDFService) {}

    @Get()
    public async getProjects(@Param("id") id: string) {
        return await Project.find();
    }

    @Get(":id")
    public async getProject(@Param("id") id: string) {
        return await Project.findOneOrFail(id);
    }

    @Get(":id/invoice")
    public async getProjectInvoice(@Param("id") id: string, @Res() res: Response) {
        const project = await Project.findOneOrFail(id);
        const items = project.tasks.map((item) => { return {
            ...item,
            subTotal: item.actualHours * project.client.rate
        }});
        let total = 0
        for (const item of items) {
            total += item.subTotal;
        }
        const buffer = await this.pdfService.toBuffer('invoice', {
            locals: {
                project,
                items,
                total,    
            }
        }).toPromise();
        const invoiceId = project.clientProjectId;
        const invoiceName = `invoice_#${invoiceId}.pdf`;

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${invoiceName}`,
            'Content-Length': buffer.length,
          })
      
          res.end(buffer)
    }

    @Post()
    public async createProject(@Body() req: ProjectDto) {
        return await Project.FromDTO(await Client.findOneOrFail(req.clientId), req);
    }

    @Put(":id")
    public async updateProject(@Param("id") id: string, @Body() req: ProjectDto) {
        return await (await Project.findOneOrFail(id)).updateFromDTO(req);
    }

    @Delete(":id")
    public async deleteProject(@Param("id") id: string) {
        (await Project.findOneOrFail(id)).remove();
        return void 0;
    }

    @Get(":id/tasks")
    public async getTasks(@Param("id") id: string) {
        return await ProjectTask.find({
            where: {
                project: {
                    id,
                }
            }
        })
    }

}