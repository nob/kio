<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Inquiry extends CI_Controller {

	public function index()
	{
        $this->load->database();
        $this->load->library(array('form_validation', 'email'));

        /* ---------------------------------------
         * input data validation. 
         * --------------------------------------- */
/*
        if ($this->form_validation->run() === FALSE) {
            //redirect back to form page and show error message.
//echo validation_errors();exit;
            redirect('http://www.kiotoinc.com/form.html?success=0');
        }
*/

        /* ---------------------------------------------
         * insert inquery record to db and get entry_id. 
         * --------------------------------------------- */
        $inquiry_type = $this->input->post('inquiry-type');
        $inquiry_type_descs = array(
            '1' => 'Request for price list and order sheet',
            '2' => 'Placing order',
            '3' => 'Questions about our products',
            '4' => 'Other inquiry',
        );
        $data = array(
                 'inquiry_type' => $inquiry_type,
                 'inquiry_type_desc' => $inquiry_type_descs[$inquiry_type],
                 'retailer_name' => $this->input->post('r-name'),
                 'retailer_url' => $this->input->post('r-url'),
                 'firstname' => $this->input->post('firstname'),
                 'lastname' => $this->input->post('lastname'),
                 'email' => $this->input->post('email'),
                 'note' => $this->input->post('note'),
                 'message' => $this->input->post('message'),
                 'create_date' => date('Y-m-d H:i:s'),
        );
        $this->db->insert('inquiries', $data);
        $entry_id = $this->db->insert_id();
        
        /* ---------------------------------------------
         * Move uploaded ordersheet.
         * --------------------------------------------- */
        $ordersheet_file = '';
        if ($inquiry_type == '2') {
            $config['upload_path'] = $this->config->item('ordersheets_dir');
            $config['allowed_types'] = 'pdf';
            $config['max_size'] = '5000'; //5000KB(5MB)
            $config['file_name'] = "entry-$entry_id.pdf";
            $this->load->library('upload', $config); 
            if ($this->upload->do_upload('ordersheet'))
            {
               $file_info  = $this->upload->data();
               $ordersheet_file = $file_info['full_path'];
            } else {
                redirect('http://www.kiotoinc.com/form.html?success=0');
            }
        }

        /* ---------------------------------------------
         * send notification email to our team.
         * --------------------------------------------- */
        $this->email->from($this->config->item('notice_from'), 
                           $this->config->item('notice_from_name')); 
        $this->email->to($this->config->item('notice_to'));
        $this->email->reply_to($data['email']);
        $this->email->subject(sprintf($this->config->item('notice_subject'), 
                                $entry_id, $data['firstname'], $data['lastname']));
		$email_body = $this->load->view('inquiry_notification_email', $data, true);
		$this->email->message($email_body);
        if ($ordersheet_file !== '') {
            $this->email->attach($ordersheet_file);
        }
        $this->email->send();
        log_message('info', $this->email->print_debugger());

        $this->email->clear(true); //clear all variables set above, including attachment file.

        /* ---------------------------------------------
         * send confirmation email to customer.
         * --------------------------------------------- */
        $this->email->from($this->config->item('confirmation_from'), 
                           $this->config->item('confirmation_from_name'));
        $this->email->to($data['email']);
        $this->email->subject($this->config->item('confirmation_subject'));
		$email_body = $this->load->view('customer_confirmation_email', $data, true);
		$this->email->message($email_body);
        if ($ordersheet_file !== '') {
            $this->email->attach($ordersheet_file);
        }
        $this->email->send();
        log_message('info', $this->email->print_debugger());

        /* ---------------------------------------
         * redirect to thank you page.
         * --------------------------------------- */
        redirect('http://www.kiotoinc.com/form.html?success=1');
	}
}
