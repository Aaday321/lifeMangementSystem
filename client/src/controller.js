import axios from "axios"

export const Account = {
    logout: function(){
        
    }
}

export const TODO = {
    METHODS: {

    },
    create: function(TODO_WRAPPER){
        const { isSimpleToDo } = TODO_WRAPPER;
        if(isSimpleToDo){
            axios.post({
                method: 'post',
                WrappedToDo: TODO_WRAPPER,
                method: 'post',
                url: SERVER_URL + '/login',
                data: { TODO_WRAPPER, method: 'CREATE_SIMPLE' },
                credentials: 'include'
            }).catch((r)=>console.log(r))
        }
    },
    fetch: function(){
        axios.get({

        })
    }
}