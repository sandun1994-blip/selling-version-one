import { Button, Flex, FormControl, FormHelperText, FormLabel, Input, Select } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'



const shippingAddressSchema=yup.object().shape({
    fullName:yup.string().required('Name is required'),
    address:yup.string().required('Adress is required'),
    city:yup.string().required('City is required'),
    postalCode:yup.number().required('Postal code is required'),
    country:yup.string().required('Country is required'),
    
})


export default function ShippingAddressForm() {

    const [error,setError] =useState(false)

const dispatch =useDispatch()
const address =useSelector((state)=>state.shippingAddress)



const [formValue,setFormValue] =useState(address?address:{fullName:'',address:'',city:'',postalCode:'',country:''})

const handleChange=(event)=>{
    const {name,value} =event.target

    setFormValue({
        ...formValue,[name]:value
    })
}


const handleSubmit =async(e)=>{

    e.preventDefault()

    try {
        await shippingAddressSchema.validate(formValue,{
            abortEarly:false
        })
    } catch (error) {
        const validationErrors={}
    
        if(error instanceof yup.ValidationError){
            error.inner.forEach(({path,message})=>{
                validationErrors[path]=message
            })
        
            
        }
        setError(validationErrors)
        return
    }
    console.log('ok');
    dispatch({type:'address/saveShippingAddress',payload:formValue})
    // redirect
    dispatch({type:'checkout/nextStep'})

}

  return (
    <form  >

        <FormControl>
            <FormLabel htmlFor='fullName'>Full Name</FormLabel>
            <Input placeholder='sandun tharuka' name='fullName' onChange={handleChange} value={formValue.fullName}></Input>
            <FormHelperText color={'red.500'} id='fullName-helper-text'>{error.fullName}</FormHelperText>
        </FormControl>

        <FormControl>
            <FormLabel htmlFor='address'>Address</FormLabel>
            <Input placeholder='123 Main street' name='address' onChange={handleChange} value={formValue.address}></Input>
            <FormHelperText color={'red.500'} id='address-helper-text'>{error.address}</FormHelperText>
        </FormControl>

        <FormControl>
            <FormLabel htmlFor='city'>City</FormLabel>
            <Input placeholder='Any town' name='city' onChange={handleChange} value={formValue.city}></Input>
            <FormHelperText color={'red.500'} id='city-helper-text'>{error.city}</FormHelperText>
            
        </FormControl>

        <FormControl>
            <FormLabel htmlFor='postalCode'>Postal Code</FormLabel>
            <Input placeholder='1234' name='postalCode' onChange={handleChange} value={formValue.postalCode}></Input>
            <FormHelperText color={'red.500'} id='postalcode-helper-text'>{error.postalCode}</FormHelperText>
        </FormControl>

        <FormControl>
            <FormLabel htmlFor=''>Country</FormLabel>
            <Select placeholder='Select a country' name='country' onChange={handleChange} value={formValue.country}>
                <option value='us'>United States</option>
                <option value='mx'>Mexico</option>
                <option value='ca'>Canada</option>
                <option value='sl'>Sri lanka</option>
            </Select>
            <FormHelperText color={'red.500'} id='country-text'>{error.country}</FormHelperText>
        </FormControl>
        <Flex display={'flex'} justifyContent='flex-end'>
            <Button type='submit' mt={4} onClick={handleSubmit}>
                Continue
            </Button>

        </Flex>
    </form>
  )
}
