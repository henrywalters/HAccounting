import { Type } from "class-transformer";
import { IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./Address.dto";

export class ClientDto {
    @IsString()
    public name: string;

    @IsNumber()
    public rate: number;

    @IsString()
    public contactName: string;

    @IsString()
    public contactEmail: string;

    @IsString()
    public phone: string;

    @ValidateNested()
    @Type(() => AddressDto)
    public billingAddress: AddressDto;

    @ValidateNested()
    @Type(() => AddressDto)
    public shippingAddress: AddressDto;
}
