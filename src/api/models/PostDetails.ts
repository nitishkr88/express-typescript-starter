import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { Post } from './Post'

@Entity({ name: 'post_details' })
export class PostDetails {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  meta: string

  @OneToOne(
    type => Post,
    post => post.details
  )
  post: Post
}
