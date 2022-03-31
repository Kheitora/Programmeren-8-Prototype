import { DecisionTree } from "https://github.com/Kheitora/Programmeren-8-Prototype/blob/main/libraries/decisiontree.js"
import { VegaTree } from "https://github.com/Kheitora/Programmeren-8-Prototype/blob/main/libraries/vegatree.js"
import { createChart } from "/scatterplot.js"


//
// DATA
//
const csvFile = "https://github.com/Kheitora/Programmeren-8-Prototype/blob/main/Data/Heart_Disease_Prediction.csv"
const trainingLabel = "Heart_Disease"  
const ignored = ["Chest_pain_type", "BP", "Cholesterol", "FBS_over_120", "EKG_results", "Slope_of_ST"]
let decisionTree
let accuracy 
let totalAmount
let amountCorrect = 0
let accuracyhtml = document.getElementById("accuracy")
//
// laad csv data als json
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)   // gebruik deze data om te trainen
        
        
    })
    
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    // todo : splits data in traindata en testdata
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    totalAmount = testData.length
    console.log(totalAmount)

    // maak het algoritme aan
    decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainData,
        categoryAttr: trainingLabel
    })

    const columns = data.map(disease => ({
        x: disease.Cholesterol,
        y: disease.Heart_Disease,
        //Age,Sex,Chest_pain_type,BP,Cholesterol,FBS_over_120,EKG_results,Max_HR,Exercise_angina,ST_depression,Slope_of_ST,Number_of_vessels_fluro,Thallium,Heart_Disease

        //
    }))
    createChart(columns)

    // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
    let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON())
    
    // todo : bereken de accuracy met behulp van alle test data
    for(let diseaseChance of testData) {
        testdisease(diseaseChance)

    }

}

function testdisease(disease) {
        // kopie van passenger maken, zonder het label
        const diseaseWithoutLabel = Object.assign({}, disease)
        delete diseaseWithoutLabel.Heart_Disease

        // prediction
        let prediction = decisionTree.predict(diseaseWithoutLabel)

        // vergelijk de prediction met het echte label
        if (prediction == disease.Heart_Disease) {
            console.log("Deze voorspelling is goed gegaan!")
            amountCorrect++
            accuracy = Math.round(amountCorrect / totalAmount * 100) 
            accuracyhtml.innerText  = `${accuracy}%`
        }else{
            console.log("deze voorspelling is shit")
        }
    }



loadData()
