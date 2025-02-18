import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { Node } from "@app/node/node.entity";
import { Workspace } from "@app/workspace/workspace.entity";

@Entity()
export class Page {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column("json", { nullable: true })
  content: JSON;

  @Column({ nullable: true })
  document: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @Column({ nullable: true })
  emoji: string | null;

  @Column({
    generatedType: "STORED",
    type: "tsvector",
    asExpression: `to_tsvector('korean', COALESCE(title, '') || ' ' || COALESCE(document, ''))`,
    nullable: true,
  })
  fts: string;

  @OneToOne(() => Node, (node) => node.page, {
    onDelete: "CASCADE",
  })
  node: Node;

  @ManyToOne(() => Workspace, (workspace) => workspace.pages, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "workspace_id" })
  workspace: Workspace;
}
