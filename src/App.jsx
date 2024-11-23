import { useState } from 'react'
import InputBox from './components'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'


//Custom hooks in react

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);
  
  //conversion method
  const convert=() =>{
    //ensuring to round off till 4 digits
    setConvertedAmount(Math.round(amount*currencyInfo[to]*10000)/10000); // as in our data we have objects with key values as : inr: 84.49811943,
  }

  //swap button functionality
  const swap = () => {
    setAmount(convertedAmount);
    setConvertedAmount(amount);
    setTo(from)
    setFrom(to)
  }

  return (
   <div 
   style={{backgroundImage: `url(https://images.pexels.com/photos/1629172/pexels-photo-1629172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`}}
   className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'>
   <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
   <form onSubmit={(e)=>{
     e.preventDefault()
     convert();
   }}>
   <div className='w-full mb-1'>
    <InputBox
    label = "From"
    amount = {amount}
    currencyOptions = {options}
    selectedCurrency  = {from}
    onCurrencyChange = {(currency) => setFrom(currency)}
    onAmountChange = {(amount) => setAmount(amount)}
    />
   </div>
   <div
     className='relative w-full h-0.5'>
      <button
      className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white
      rounded-md bg-blue-600 text-white px-2 py-0.5' 
      onClick={swap}>Swap</button>

   </div>
   <div className='w-full mb-1'>
    <InputBox
    label = "to"
    amount = {convertedAmount}
    amountDisabled
    currencyOptions = {options}
    selectedCurrency  = {to}
    onCurrencyChange = {(currency)=>setTo(currency)}
    />
   </div>
   <button
   type='submit'
   className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg m-auto'>
    Convert {from.toUpperCase()} to {to.toUpperCase()}</button> 
   </form>
   </div>
   </div> 
  )
}

export default App
