import { ClientDto } from "src/dtos/client.dto";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Address } from "./address.entity";

@Entity()
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public name: string;

    @Column({type: "float"})
    public rate: number;

    @Column()
    public contactName: string;

    @Column()
    public contactEmail: string;

    @Column()
    public phone: string;

    @ManyToOne(() => Address, {eager: true})
    public billingAddress: Address;

    @ManyToOne(() => Address, {eager: true})
    public shippingAddress: Address;

    public async updateFromDTO(req: ClientDto) {
        this.name = req.name;
        this.rate = req.rate;
        this.contactName = req.contactName;
        this.contactEmail = req.contactEmail;
        this.phone = req.phone;
        this.billingAddress = this.billingAddress ? 
            await this.billingAddress.updateFromDTO(req.billingAddress) : 
            await Address.fromDTO(req.billingAddress);
        this.shippingAddress = this.shippingAddress ?
            await this.shippingAddress.updateFromDTO(req.shippingAddress) :
            await Address.fromDTO(req.shippingAddress);
        await this.save();
        return this;
    }

    public static async FromDTO(req: ClientDto) {
        const client = new Client();
        await client.updateFromDTO(req);
        return client;
    }
}