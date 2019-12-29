import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
  JoinColumn,
  JoinTable
} from 'typeorm'
import { PostDetails } from './PostDetails'
import { Category } from './Category'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  title: string

  @Column({ nullable: true })
  text: string

  @OneToOne(
    type => PostDetails,
    details => details.post,
    { cascade: true }
  )
  @JoinColumn({ name: 'post_details_id' })
  details: PostDetails

  @ManyToMany(
    type => Category,
    category => category.posts,
    { cascade: true }
  )
  @JoinTable({ name: 'post_category' })
  categories: Category[]
}
