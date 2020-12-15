import { IsBoolean, IsNumber, IsSemVer, IsString } from "class-validator";

export class ProjectTaskDto {
    @IsString()
    public projectId: string;

    @IsString()
    public name: string;

    @IsString()
    public description: string;

    @IsBoolean()
    public complete: boolean;

    @IsNumber()
    public estimatedHours: number;

    @IsNumber()
    public actualHours: number;
}