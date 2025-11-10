import { Entity, Enum, Opt, Property } from "@mikro-orm/core";
import { CustomBaseEntity } from "./custom-base.entity";

enum propStatus {
    AVAILABLE = "available",
    PENDING = 'pending',
    ACTIVE = "active"
}

@Entity()
export class User extends CustomBaseEntity {

    @Property()
    managerId: string

    @Property()
    title: string

    @Property()
    description: string

    @Property()
    price: Float32Array

    @Property()
    address: string

    @Property()
    amenities: string[]

    @Property()
    images?: string[]

    @Property({ default: propStatus.AVAILABLE })
    @Enum(() => propStatus)
    role: string & Opt = propStatus.AVAILABLE

    @Property({ nullable: true })
    deleted_at?: Date


    toDto() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            price: this.price,
            ameniites: this.amenities
        }
    }


}