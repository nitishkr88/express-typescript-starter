import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Post } from './Post'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string

  @ManyToMany(
    type => Post,
    post => post.categories
  )
  posts: Post[]
}
