import { toDoSchema } from '../toDoModel'
import mongoose from 'mongoose'

const ToDo = mongoose.model("todo", toDoSchema);

export const LIST = {
    getList: async function() {
        const allToDos = await ToDo.find({});
        console.log(allToDos);
        return {list:allToDos};
    },
    addItem: async function(toDo){
        if(((await ToDo.find({title: toDo})).length > 0)) return 'duplicate';
        const newDo = new ToDo({
            title: toDo,
            content: toDo
        });
        const savedDo = await newDo.save();
        if(savedDo) return 'success';
        else return 'err';
    }
};

export const MAINTENANCE = {
    cleanList: async function(){
        const fullList = await ToDo.find();
        for(let i of fullList){
            if(!i.title) await ToDo.deleteOne(i);
        };
        return "Done!";
    },
};