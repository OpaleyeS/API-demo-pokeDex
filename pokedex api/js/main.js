//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value.replaceAll('.', '').replaceAll('-','')
  console.log(choice)
  
  const url = `https://pokeapi.co/api/v2/pokemon/${choice}`
  /*`https://pokeapi.co/api/v2/pokemon/${choice.toLocaleLowerCase()}/`*/

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        const potentialPet = new Poke(data.name,data.height,data.weight,data.types,data.sprites.other['official-artwork'].front_default)
        
        potentialPet.getTypes()
        potentialPet.isItHousepet()
       
        let decision = ''
        if(potentialPet.housepet){
        decision = 'This pokemon is deamed safe to keep in a home'
        }else{
          let reasonStr = potentialPet.reason.joion(' and ')
          decision = `This pokemon would not be considered safe to keep as a pet because${potentialPet.reason.join(' and ')}.`
        }
      document.querySelector('h2').innerText = decision
      document.querySelector('img').src = potentialPet.image
      })
      .catch(err => {
          console.log(`error ${err}`)
          document.querySelector('h2').innerText = `Pokemon not found. Please try again`
      });
    }

    class Poke {
      constructor (name, height, weight, types, image) {
        this.name = name
        this.height = height
        this.weight = weight
        this.types = types
        this.typeList = []
        this.image = image 
        this.housepet = true
        this.reason = []
      }
      getTypes(){
        for (const property of this.types) {
          this.typeList.push(property.types.name)
        }
        console.log(this.typeList)
      }
    weightToPounds (weight){
         console.log(Math.round((weight/4.536)*100)/100)
        return Math.round((weight/4.536)*100)/100
      }
      heightToFeet (height) {
        console.log(Math.round((height/3.048)*100/100))
        return Math.round((height/3.048)*100)/100
      }
      isItHousepet(){
        //check height, weigtht and types
        let badtypes = ['shadow']
        if(this.weightToPounds(this.weight) > 400) {
          this.reason.push(`${pokemon}is really heavy`)
          this.housepet = false
        }
        if(this.heightToFeet(this.height) > 7) {
          this.reason.push(`${pokemon} is verry tall`)
          this.housepet = false
        }
        if(badtypes.some(r => this.typeList.indexOf(r) >= 0)){
          this.reason.push("its type is too dangerous")
          this.housepet = false
        }
        console.log(this.reason)
      }
    }
    /*class pokemon {
      constructor (name, height, weight, types,image, location ) {
        super(name, height, weight, types,image)
        this.locationURL = location
        this.locationList = []
        this.locationstring = ''
      }

      /*encounterInfo() {
        fetch(this.locationURL)
           .then(res => res.json())
           .then(data => {
            console.log(data)
            for (const item of data) {
              this.locationList.push(item.location_area.name)
            }
            let target = document.getElementById('locations')
            target.innerText = this.locationCleanup()
           })
           .catch(err => {
            console.log(`error ${err}`)
           });
      }
      locationCleanup(){
        const words = this.locationList.slice(0,5).join(',').replaceAll('-', ' ').split(" ")
        for (let i= 0; i<words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].slice(1)
        }
        return words.join(' ')
      }
    }*/