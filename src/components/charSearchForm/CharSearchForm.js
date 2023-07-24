import {useState, useMemo} from 'react' 
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik' 
import * as Yup from 'yup' 
import {Link} from 'react-router-dom' 

import MarvelService from '../../services/MarvelService' 
import ErrorMessage from '../error/ErrorMessage' 
import useHttp from '../../hooks/http.hook' 

import './charSearchForm.scss' 

const CharSearchForm = () => {
  const [char, setChar] = useState(null) 
  const service = useMemo(() => new MarvelService(), [])
  const {clearError} = useHttp()
  //{loading, error, getCharacterByName, clearError}

    const onCharLoaded = (char) => {
        setChar(char) 
    }

    const updateChar = (name) => {
        clearError() 
        service.getCharacterByName(name)
            .then(onCharLoaded) 
    }
//`https://gateway.marvel.com:443/v1/public/characters/${char[0].id}?apikey=bd8673ecbff251cdb59ed3a0d89b43e2`
  //https://www.marvel.com/characters/gamora
    const errorMessage = service.error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null 
    const results = !char ? null : char.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`https://www.marvel.com/characters/${char[0].name}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div> 

    return (
        <div className="char__search-form">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName) 
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={service.loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm 