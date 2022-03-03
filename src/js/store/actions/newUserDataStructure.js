export function newUserDataStructure (firstName, lastName, age, userID) {
    console.log(firstName, lastName, age, userID)
    const user = {
        levels: {
            weeks: {
                'שבוע 1':{
                    '1':{
                        active: true,
                        scores: [],  
                    },
                    '2':{
                        active: false,
                        scores: [],  
                    },
                    '3':{
                        active: false,
                        scores: [],  
                    },
                    '4':{
                        active: false,
                        scores: [],  
                    },
                    '5':{
                        active: false,
                        scores: [],  
                    },
                    '6':{
                        active: false,
                        scores: [],   
                    },
                    '7':{
                        active: false,
                        scores: [],  
                    },
                    '8':{
                        active: false,
                        scores: [],  
                    },                 
                },
                'שבוע 2':{
                    '9':{
                    active: false,
                    scores: []  
                    },
                    '10':{
                        active: false,
                        scores: [],  
                    },
                    '11':{
                        active: false,
                        scores: [],  
                    },
                    '12':{
                        active: false,
                        scores: [],  
                    },
                    '13':{
                        active: false,
                        scores: [],  
                    },
                    '14':{
                        active: false,
                        scores: [],  
                    },
                    '15':{
                        active: false,
                        scores: [],  
                    },
                    '16':{
                        active: false,
                        scores: [],  
                    },       
                },
            },         
        },
        name: {
            first: firstName,
            last: lastName
        },
        age: age,
        userID: userID
    }
    return user;
}

