<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditUserData extends FormRequest
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
             'name'                  => 'required|min:2|max:28',
            'phone'                 => 'required|numeric|digits:10',
            'dob'                   => 'required|max:10|regex:/^[0-9 -]+$/',
            'select_city'           => 'required',
            'height'                => 'required',
            'language_id'           => 'required',
            'home_town'             => 'required',
            'hobbies'               => 'required'
        ];
    }
    
     public function messages()
    {
        return [
            'name.required'                 => 'Name field is required.',
             'name.max:28'                   => 'Name only accept 28 characters.',           
            'phone.required'                => 'Phone field is required.',
//            'phone.unique'                  => 'A user with this Mobile Number already exists.',
            'phone.numeric'                 => 'Please enter only numbers.',
            'phone.digits'                 => 'Please enter only 10 digits numbers.',
            'dob'                           => 'Date of birth field is required.',   
            'select_city'                   => 'City field is required.',
            'height'                        => 'height field is required',
            'language_id'                   => 'language-Id field is required',
            'home_town'                     => 'home-town field is required',
            'hobbies'                       => 'hobbies field is required'
            ];
    }
}
