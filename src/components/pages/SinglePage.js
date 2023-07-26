import { useParams } from 'react-router-dom'  
import { useState, useEffect } from 'react'  
import useHttp from '../../hooks/http.hook'

import MarvelService from '../../services/MarvelService'  
import Spinner from '../spinner/Spinner'  
import ErrorMessage from '../error/ErrorMessage'  
import AppBanner from "../appBanner/AppBanner"  


const SinglePage = ({Component, dataType}) => {
        const {comicId} = useParams()  
        const [data, setData] = useState(null)  
        const {getComic, getOneCharacter} = new MarvelService()  
        const {clearError, loading, error, } = useHttp()
        useEffect(() => {
            updateData()
        }, [comicId])

        const updateData = () => {
            clearError()  
            switch (dataType) {
                case 'comic':
                    getComic(comicId).then(onDataLoaded)  
                    break;  
                case 'character':
                getOneCharacter(comicId).then(onDataLoaded)  
                    break; 
                default: throw new Error('No case')
            }
        }

        const onDataLoaded = (data) => {
            setData(data)  
        }

        const errorMessage = error ? <ErrorMessage/> : null  
        const spinner = loading ? <Spinner/> : null  
        const content = !(loading || error || !data) ? <Component data={data}/> : null  

        return (
            <>
                <AppBanner/>
                {errorMessage}
                {spinner}
                {content}
            </>
        )
}

export default SinglePage  