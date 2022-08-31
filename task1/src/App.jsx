import React, { useEffect, useState } from 'react'
import People from './data.json'

function App() {
  // States
  const [originalPeople] = useState(People)
  const [people, setPeople] = useState([...originalPeople])
  const [sortMethod, setSortMethod] = useState('no_sort')

  // Inputs
  const [sortingMethods] = useState([
    {
      'sort': 'no_sort',
      'label': 'Unsorted'
    }, {
      'sort': 'name',
      'label': 'Name'
    }, {
      'sort': 'age',
      'label': 'Age'
    }
  ])
  const radioInput = (sort, label) => {
    return <>
      <input
        type="radio"
        name={sort}
        value={sort}
        id={sort}
        onChange={(e) => handleSort(e)}
        checked={sortMethod === sort}
      />
      <label 
        htmlFor={sort}
        className='text-lg pl-2'
      >{label}</label>
      {sort != 'no_sort' && 
        <button 
          className='ml-2 text-lg px-1.5 absolute right-1' 
          onClick={(e)=> handleClick(e)}
        > ↹ </button>}
    </>
  }

  const handleSort = (e) => {
    setSortMethod(e.target.value)
    let value = e.target.value

    if (value === 'name') {
      setPeople(people.sort((a, b) => {
        let fa = a.firstName.toLowerCase(), fb = b.firstName.toLowerCase();
        if (fa < fb) { return 1 }
        if (fa > fb) { return -1 }
        return 0
      }))
    }

    if (value === 'age') {
      setPeople(people.sort((a, b) => {
        let fa = a.birthday, fb = b.birthday;
        if (fa < fb) { return 1 }
        if (fa > fb) { return -1 }
        return 0
      }))
    }

    if (value === 'no_sort') {
      setPeople([...originalPeople])
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    let reversedPpl = [...people].reverse()
    console.log(people, reversedPpl)
    setPeople([...people].reverse())
  }

  return (
    <div className="mx-auto max-w-xl mt-10">

      <form className='absolute top-20 left-80 bg-blue-200 p-3 pr-10 rounded shadow-md'>
          <h2>Sort people</h2>
          {sortingMethods.map(method => (
            <div key={method.sort} className=''>
              {radioInput(method.sort, method.label)}
            </div>
          ))}
      </form>
      

      <header>
        <h1 className="text-3xl font-bold">Birthdays</h1>
      </header>
      <main>
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {people ? people.map(person => (
              <tr>
                <td>{person.firstName} {person.lastName}</td>
                <td>{new Date(person.birthday).toDateString()}</td>
              </tr>
            )) : 'Loading people'}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
