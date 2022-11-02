import axios from 'axios'

export const GET_LIST_CAR = "GET_LIST_CAR";

export const getListCar = () => {
    console.log('2. Masuk action')
    return (dispatch) => {

        //loading
        dispatch({
            type: GET_LIST_CAR,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        //get API
        axios({
            method: 'GET',
            url: "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json",
            timeout: 120000
        })
            .then((response)=>{
                //berhasil get API
                console.log('3. Berhasil Get API :', response.data)
                dispatch({
                    type: GET_LIST_CAR,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((error)=>{
                //gagal get API
                console.log('3. Gagal Get API', error.message)
                dispatch({
                    type: GET_LIST_CAR,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message
                    }
                })
            })
    }
}