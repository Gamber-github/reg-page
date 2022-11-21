import { createApi, fetchBaseQuery, retry} from `@reduxjs/toolkit/query/react`;

import { RootState } from `../store`;

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001/user/login',
    prepareHeaders: (headers, {getState}) => {
        
    }

})