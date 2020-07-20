import { combineReducers } from "redux";
import services from "./services";

const initialState = {
  directories: {
    '0x1': {
      dirName: 'DappData',
      metaHash: '0x...',
      items: {
        '0': {
          itemName: 'File 1.jpg',
          fileSize: 12233,
          mimeType: 'JPEG'
        }
      }
    },
    '0x2': {
      dirName: 'Images',
      metaHash: '0x...',
      items: {
        '0': {
          itemName: 'File 2.jpg',
          fileSize: 12233,
          mimeType: 'JPEG'
        }
      }
    }
  },
  directoryList: [],
  idInfo: {
    idString: "KarsDrive-1",
    balanceEth: 1000000000000000000,
    balanceFdt: 20000000000000000000
  }
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DIRECTORY":
      return {
        ...state,
        directories: [...state.directories, action.directories]
      };

    default:
      return state;
  }
};

const servicesReducers = {};
Object.values(services).forEach(({ mountPoint, reducer }) => {
  servicesReducers[mountPoint] = reducer;
});

export default combineReducers({
  ...servicesReducers,
  globalReducer
});
