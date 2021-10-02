<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserProfileValidate extends FormRequest
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
            // 'user_id'               => 'required',
            'tag_line'              => 'required',
            'short_bio'             => 'required',
             'height'               => 'required|regex:/^[1-9]\d*(\.\d+)?$/',
             'skin_color'           => 'required|min:2|max:28',
            'language_id'           => 'required',
            // 'phone'                 => 'unique:users',
            // 'dob'                   => 'max:10|regex:/^[1-9]\d*(\.\d+)?$/',
            // 'gender'                => 'alpha',
            // 'state_id'              => '',
            // 'city_id'               => ''
        ];
    }
    
    public function messages()
    {
        return [
            // 'user_id.required'              => 'User id is required',
            'tag_line.required'             => 'Tag line is required.',
            'short_bio.required'            => 'short bio field  is required.',
            'work_experiences.required'     => 'Work Experience is required.',
            'qualifications.required'       => 'Qualification is required.',
            'social_links.required'         => 'Social link is required.',
            'language_id.required'          => 'language is required.',
            'height.required'               => 'Height is required.',
            'height.regex'                  => 'Please enter a valid height.',
            'skin_color.required'           => 'Skin color is required',
            'skin_color.min'                => 'Please enter the correct value',
            'skin_color.max'                => 'Please enter the correct value',
            ];
    }
}
