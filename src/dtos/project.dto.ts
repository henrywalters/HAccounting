import { IsEnum, IsSemVer, IsString } from "class-validator";
import { ProjectStatus } from "./../entities/project.entity"

export class ProjectDto {
    @IsString()
    public name: string;

    @IsString()
    public description: string;

    @IsEnum(ProjectStatus)
    public status: ProjectStatus;

    @IsString()
    public clientId: string;
}