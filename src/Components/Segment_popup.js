import React, { useState } from 'react'
import { Await } from 'react-router-dom';

export default function Segment_popup({ onCancel }) {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchema, setNewSchema] = useState('');
  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ];
  let link = "https://webhook.site/e78d4f76-7264-4294-bd34-ec94a283a88d"
  const handleAddSchema = () => {
    if (newSchema && !selectedSchemas.includes(newSchema)) {
      setSelectedSchemas([...selectedSchemas, newSchema]);
      setNewSchema('');
    }
  };

  const handleRemoveSchema = (index) => {
    const updatedSchemas = [...selectedSchemas];
    updatedSchemas.splice(index, 1);
    setSelectedSchemas(updatedSchemas);
  };
  async function postData(e) {
    e.preventDefault();
    try {
      console.log('selectedSchemas', selectedSchemas)
      const response = await fetch(link, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          segment_name: segmentName,
          schema: selectedSchemas.map(schema => ({ [schema]: schemaOptions.find(option => option.value === schema).label }))
        })
      });
      alert('Your segment is saved successfully')
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <>
      <div className='popup_heading_section'>
        <span className="material-symbols-outlined">chevron_left</span>
        <h1>Saving Segment</h1>
      </div>
      <div className='form_section'>
        <form onSubmit={postData}>
          <div className='input_segment_section'>
            <label htmlFor='name'>Enter the Name of the Segment</label>
            <input type='text' id='name' placeholder="Name of the Segment" value={segmentName} onChange={(e) => setSegmentName(e.target.value)} required />
          </div>
          <div className='drop_down_section'>
            <p className='note_text'>To save  your segment, you need to add the schemas to build the query</p>
            <div className='traits_section'>
              <div className='user_traits'><span className='user_traits_dot'></span> <span className='user_text'>-User Traits</span></div>
              <div className='group_traits'> <span className='group_traits_dot'></span> <span className='group_text'>-Group Traits</span></div>
            </div>
            <div>
              <div className={selectedSchemas.length > 0 ? 'blueBorder' : ''}>
                {selectedSchemas.map((schema, index) => (
                  <div key={index} className='new_drop_down'>
                    <span className={schema === 'account_name' || schema === 'state' || schema === 'city' ? 'group_traits_dot' : 'user_traits_dot'}></span>
                    <select
                      value={schema}
                      onChange={(e) => {
                        const updatedSchemas = [...selectedSchemas];
                        updatedSchemas[index] = e.target.value;
                        setSelectedSchemas(updatedSchemas);
                      }}
                    >
                      <option value="" disabled>Select schema</option>
                      {schemaOptions
                        .filter(option => !selectedSchemas.includes(option.value) || option.value === schema)
                        .map(option => (
                          <option key={option.value} value={option.value} >{option.label}</option>
                        ))}
                    </select>
                    <div className='remove_btn_section'>
                      <span className="material-symbols-outlined" onClick={() => handleRemoveSchema(index)}>
                        remove
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className='drop_down'>
                <span className='gray_dot_traits'></span>
                <select
                  value={newSchema}
                  onChange={(e) => setNewSchema(e.target.value)}
                  >
                  <option value="" disabled>Add schema to segment</option>
                  {schemaOptions
                    .filter(option => !selectedSchemas.includes(option.value))
                    .map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <div className='remove_btn_section'>
                  <span className="material-symbols-outlined" onClick={() => handleRemoveSchema}>
                    remove
                  </span>
                </div>
              </div>
              <div className='add_new_schema_link'>
                <a onClick={handleAddSchema}><span className='plus_icon'>+</span><span className='text_add_new'>Add new schema</span></a>
              </div>
            </div>
          </div>
          <div className='save_btn_section'>
            <button type="submit">Save the segment</button>
          </div>
        </form>
        <div className='cancel_btn_section'>
          <button className='canel_btn' onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </>

  )

}
