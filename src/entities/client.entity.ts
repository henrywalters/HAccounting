import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public name: string;

    @Column({type: "float"})
    public rate: number;

    @Column({nullable: true})
    public contactName?: string;

    @Column({nullable: true})
    public contactEmail?: string;

    @Column()
    public phone: string;

    @Column()
    public billingAddress: string;

    @Column()
    public billingState: string;

    @Column()
    public billingCity: string;

    @Column()
    public billingAreaCode: string;

    @Column({type: "bool", default: false})
    public shippingSameAsBilling: boolean;

    @Column({nullable: true})
    public shippingAddress: string;

    @Column({nullable: true})
    public shippingState: string;

    @Column({nullable: true})
    public shippingCity: string;

    @Column({nullable: true})
    public shippingAreaCode: string;
}