import { DAY_PAGE_LOADED, DAY_ADDED,
  TASK_ADDED, UPDATE_TASK } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case DAY_PAGE_LOADED:
      return {
        ...state,
        days: action.payload.day
      };
    case TASK_ADDED:
      return {
        ...state,
        days: state.days.map(day => {
            if (day.id === action.payload.task.dayId._id) {
              return {
                ...day,
                tasks: day.tasks.concat([action.payload.task])
              };
            }
            return day;
          })
      };
    case UPDATE_TASK:
      return {
        ...state,
        days: state.days.map(day => {
            if(day.id === action.payload.task.dayId) {
              return {
                ...day,
                tasks: day.tasks.map(task => {
                  if (task.id === action.payload.task.id) {
                    task.state = action.payload.task.state;
                    return task;
                  }
                  return task;
                })
              }
            }
            return day;
          }
        )
      }
    case DAY_ADDED:
      return {
        ...state,
        days: state.days.concat([action.payload.day]),
      };
    default:
      return state;
  }
};
