import { useState } from "react";
import Container from "../../components/Container";
import Inicial from "../../fragments/Inicial";
import YesOrNo from '../../fragments/YesOrNo';
import Foods from "../../fragments/Foods";
import Height from "../../fragments/Height";
import Weight from '../../fragments/Weight';
import Result from '../../fragments/Result';
import HairRemoval from '../../fragments/Drinks'

import Stress from '../../fragments/Stress';

import BANANA from '../../assets/foods/banana.png'
import LEITE from '../../assets/foods/leite.png'
import GENGIBRE from '../../assets/foods/gengibre.png'
import APPLE from '../../assets/foods/maca.png'
import CHOCOLATE from '../../assets/foods/chocolate.webp'

import Stepper from '../../fragments/Stepper';
import Body from '../../fragments/Body';
import {  Button } from "@material-ui/core";
import Loader from "../../fragments/Loader";

import './Quiz.css';


export default function QuizPage() {
  const [activeStep, setActiveStep] = useState(0);

  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch('Receita_Personalizada.pdf').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'Receita_Personalizada.pdf';
            alink.click();
        })
    })
}

  const [data, setData] = useState({
    age: {
      value: '',
      photo: '',
      id: 0,
    },
    foods: [
      { photo:GENGIBRE, text:'Gengibre', id: 1, isChecked: false },
      { photo:BANANA, text:'Banana', id: 2, isChecked: false },
      { photo:LEITE, text:'Leite', id: 3, isChecked: false },
      { photo:CHOCOLATE, text:'Chocolate', id: 4, isChecked: false },
      { photo:APPLE, text:'Maça', id: 5, isChecked: false },
    ],
    height: 1.6,
    weight: 70,
    loaded: false,
    bodies: [
      {id: 1, text: 'Peito', isChecked: false},
      {id: 2, text: 'Barriga', isChecked: false},
      {id: 3, text: 'Coxas', isChecked: false},
      {id: 4, text: 'Costas', isChecked: false},
      {id: 5, text: 'Glúteos', isChecked: false},
      {id: 6, text: 'Posterior', isChecked: false},
    ],
    hairRemoval: {
      id:'',
      text:'',
      photo:''
    },
    pregnant: undefined,
    stress: undefined,
  })

  console.log(data)

  const handleClick = (info) => {
    setData((prevState) => {
      return {
        ...prevState,
        ...info
      }
    })

  }

  const isDesabled = (): boolean => {
    let disabled = true;


    if(activeStep === 0) {
      const hasAge = Boolean(data.age.value)
      disabled = !hasAge;
    }

    if(activeStep === 1) {
      const hasHeight = data.height;
      disabled = !hasHeight;
    }

    if(activeStep === 2) {
      const hasWeight = data.weight;
      disabled = !hasWeight;
    }

    if(activeStep === 3 ) {
      const hasBodies = data.bodies.filter(body => body.isChecked).filter(i=>i).length > 0
      disabled = !hasBodies;
    }

    if(activeStep === 4 ) {
      const hasFoods = data.foods.filter(food => food.isChecked).filter(i=>i).length > 0
      disabled = !hasFoods;
    }

    if(activeStep === 5 ) {
      disabled = !(data.pregnant !== undefined);
    }

    if(activeStep === 6) {
      disabled = !(data.stress !== undefined);
    }

    if(activeStep === 7) {
      disabled = !data.loaded;
    }

    if(activeStep === 8) {
      disabled = false
    }


    return disabled;
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

        <div className="pt-8 pb-12 flex flex-col ">
          { activeStep !== 8 && <Stepper activeStep={activeStep} steps={7} handleNext={handleNext} handleBack={handleBack}/>}
          <Container>
            {activeStep === 0 && <Inicial age={data.age} handleStep={handleClick}/>}
            {activeStep === 1 && <Height height={data.height} handleStep={handleClick} />}
            {activeStep === 2 && <Weight weight={data.weight} handleStep={handleClick} />}
            {activeStep === 3 && <Body bodies={data.bodies} handleStep={handleClick}/>}
            {activeStep === 4 && <Foods foods={data.foods} handleStep={handleClick} />}
            {activeStep === 5 && <YesOrNo pregnant={data.pregnant} handleStep={handleClick}/>}
            {activeStep === 6 && <Stress stress={data.stress} handleStep={handleClick}/>}
            {activeStep === 7 && <Loader handleStep={handleClick} />}
            {activeStep === 8 && <Result data={data}/>}

          </Container>
        </div>
        <div className="submit-button-wrapper-wrapper ">
          <div className="submit-button-wrapper">
            <Button
              variant="contained"
              color='secondary'
              onClick={activeStep === 8 ? onButtonClick : handleNext}
              disabled={isDesabled()}
              fullWidth
            >  
              <span > {activeStep === 8 ? 'Download Programa' : 'Próximo'} </span>  
            </Button>
        </div>
        </div>
        </div>
  )
}
