const authReducer = (
  state = { authdata: null, loading: false, error: false,updateLoading:true },
  action
) => {
    switch (action.type) {
       case "AUTH_START":
        return {...state,loading:true,error:false};
        case "AUTH_SUCCESS":
            localStorage.setItem("profile",JSON.stringify({...action?.data}))
        return {...state,authdata:action.data,loading:false,error:false};
        case "AUTH_FAIL":
        return {...state,loading:false,error:true};
        case "UPDATING_START":
            return {...state, updateLoading: true , error: false}
          case "UPDATING_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({...action?.data}));
            return {...state, authdata: action.data, updateLoading: false, error: false}
          
          
            case "UPDATING_FAIL":
            return {...state, updateLoading: false, error: true}

            case "FOLLOW_USER":
      return {...state, authdata: {...state.authdata, user: {...state.authdata.user, following: [...state.authdata.user.following, action.data]} }}
    
    case "UNFOLLOW_USER":
      return {...state, authdata: {...state.authdata, user: {...state.authdata.user, following: [...state.authdata.user.following.filter((personId)=>personId!==action.data)]} }}
        case "LOG_OUT":
            localStorage.clear()
            return {...state,authdata:null,loading:false,error:false}
        default:
        return state;

    }
};
export default authReducer;
