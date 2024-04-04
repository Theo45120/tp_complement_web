import { ENDPOINT } from '../config.js'

export default class PersonnageProvider {

    static fetchPersonnages = async (limit = 10) => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
           const response = await fetch(`${ENDPOINT}?_limit=${limit}`, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }

    static getPersonnage = async (id) => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
           const response = await fetch(`${ENDPOINT}/` + id, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }

    static PutNote = async (id, note) => {
        const options = {
           method: 'PATCH',
           headers: {
               'Content-Type': 'application/json'
           },
           body:JSON.stringify({note: note})
       };
       try {
           const response = await fetch(`${ENDPOINT}/` + id, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }

    static PutEquipement = async (id, equipement) => {
        const options = {
           method: 'PATCH',
           headers: {
               'Content-Type': 'application/json'
           },
           body:JSON.stringify({equipements: equipement})
       };
       try {
           const response = await fetch(`${ENDPOINT}/` + id, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }
}