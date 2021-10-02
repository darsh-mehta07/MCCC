<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidateCastingCall extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'                  => 'required|min:2|max:100',
            'short_description'      => 'required',
//            'gender'                 => 'required',
//            'closing_date'           => 'required',
//            'location'               => 'required',
            'tags'                   => 'required',
            'long_description'       => 'required',
//            'language_id'            => 'required'
            'fileSource'            => 'required|image|mimes:jpeg,png,jpg'
        ];
    }
    
    
    public function messages()
    {
        return [
            'title.required'                 => 'Title field is required.',
            'short_description.required'     => 'Short description field  is required.',
//            'gender.required'                => 'Gender field is required.',
//            'closing_date.required'          => 'Closing date field  is required.', 
//            'location.required'              => 'Location field is required.',
            'tags.required'                  => 'Tags field is required.',
            'long_description.required'      => 'Long description field is required.',
//            'language_id.required'           => 'Language field is required.',
            
            ];
    }
}
