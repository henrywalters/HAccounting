import { AddressDto } from "src/dtos/Address.dto";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public address: string;

    @Column()
    public state: string;

    @Column({default: "United States"})
    public country: string;

    @Column()
    public city: string;

    @Column()
    public areaCode: string;

    public async updateFromDTO(req: AddressDto) {
        console.log(req);
        this.address = req.address;
        this.state = req.state;
        this.city = req.city;
        this.country = req.country;
        this.areaCode = req.areaCode;
        await this.save();
        return this;
    }

    public static async fromDTO(req: AddressDto) {
        const address = new Address();
        await address.updateFromDTO(req);
        return address;
    }
}