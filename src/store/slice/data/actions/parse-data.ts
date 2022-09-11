import { createAsyncThunk } from '@reduxjs/toolkit';
import Papa from 'papaparse';

export type Result = {
  [key: string]: string;
}

const parseFile = async (file: File): Promise<Result[]> => new Promise((resolve, reject) => {
    Papa.parse<Result>(file, {
      header: true,
      complete:(results) => resolve(results.data),
      error: (error: Error) => reject(error)
    });
});

const parseData = createAsyncThunk<Result[], File, {
  rejectValue: { error: string }, returnValue: Result[]
}>(
  'data/parseData',
  async (file, thunkAPI) => {
    try {

      return await parseFile(file);

    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: 'Impossible to parse file'
      });
    }
  }
);

export default parseData;

