import { useState } from "react";
import Container from "../../components/Container";
import Inicial from "../../fragments/Inicial";
import Foods from "../../fragments/Foods";
import Height from "../../fragments/Height";
import Weight from '../../fragments/Weight';
import Drinks from '../../fragments/Drinks';
import Result from '../../fragments/Result';

import Stepper from '../../fragments/Stepper';
import Body from '../../fragments/Body';
import {  Button } from "@material-ui/core";


export default function QuizPage() {
  const [activeStep, setActiveStep] = useState(0);

  const [data, setData] = useState({
    age: {
      value: '',
      photo: '',
    },
  })

  console.log('data', data)

  const handleClick = (info) => {
    setData((prevState) => {
      return {
        ...prevState,
        ...info
      }
    })
  }


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if(activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } 
  };

  return (
    <div className="bg-slate-800 ">
        <div className="pt-8 pb-8 h-screen flex flex-col ">
          <Stepper activeStep={activeStep} steps={6} handleNext={handleNext} handleBack={handleBack}/>
          <Container>
            {activeStep === 0 && <Inicial handleStep={handleClick}/>}
            {activeStep === 1 && <Height/>}
            {activeStep === 2 && <Weight />}
            {activeStep === 3 && <Body />}
            {activeStep === 4 && <Foods />}
            {activeStep === 5 && <Drinks />}
            {activeStep === 6 && <Result data={data}/>}
 
          </Container>
        </div>
          <div className="absolute fixed w-full w-screen bottom-0 flex justify-center ">
          <div className="w-full max-w-xs">
            <Button
              variant="contained"
              color='secondary'
              onClick={handleNext}
              fullWidth
            >  
              <span > Próximo </span>  
            </Button>
          </div>
        </div>
        </div>
  )
}