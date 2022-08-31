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
      <label htmlFor={sort}>{label}</label>
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
    setPeople([...reversedPpl])
  }

  return (
    <div className="mx-auto max-w-xl">

      <form>
          <h2>Sort people</h2>
          {sortingMethods.map(method => (
            <div key={method.sort}>
              {radioInput(method.sort, method.label)}
            </div>
          ))}
      </form>
      <button onClick={(e)=> handleClick(e)}>↹</button>

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
