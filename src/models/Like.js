import mongoose, {Schema} from 'mongoose'

const schema = mongoose.Schema({
    blogId:{type:Schema.Types.ObjectId, ref:'Blog'},
    count:Number,
    lovers:[{type:Schema.Types.ObjectId, ref:'User'}],
})

export default mongoose.model('Like', schema)