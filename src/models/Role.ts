import mongoose from "mongoose"

interface IRole {
  value?: string;
};

const RoleSchema = new mongoose.Schema<IRole>({
  value: { type: String, unique: true, default: "USER" }
})

export default mongoose.model<IRole>('Role', RoleSchema)