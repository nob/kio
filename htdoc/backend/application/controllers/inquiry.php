<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Inquiry extends CI_Controller {

	public function index()
	{
        $this->load->library(array('form_validation', 'email'));


        /* ---------------------------------------
         * input data validation here. 
         * --------------------------------------- */
        //$valid = 1;
        //if ( ! $valid) {
            /* ---------------------------------------
             * redirect to error page.
             * --------------------------------------- */
        //    redirect('http://www.kiotoinc.com/form.html?success=1');
        //}

/*
        $data = array(
                 'inquiry_type' => $this->input->post('inquiry-type'),
                 'r_name' => $this->input->post('r-name'),
                 'r_url' => $this->input->post('r-url'),
                 'firstname' => $this->input->post('firstname'),
                 'lastname' => $this->input->post('lastname'),
                 'email' => $this->input->post('email'),
                 'ordersheet' => $this->input->post('ordersheet'),
                 'note' => $this->input->post('note'),
                 'message' => $this->input->post('message'),
        );

        if ($data['inquiry_type'] = '2') {
            $config['upload_path'] = '../ordersheets/';
            $config['allowed_types'] = 'gif|jpg|png';
            $config['max_size'] = '5000';
            $this->load->library('upload', $config); 
        }
*/

        /* ---------------------------------------------
         * insert inquery record to db and get order_id. 
         * --------------------------------------------- */


        /* ---------------------------------------------
         * send notification email to our team.
         * --------------------------------------------- */
//echo $this->config->item('notice_from');
//exit;
        $this->email->from($this->config->item('notice_from'), 
                           $this->config->item('notice_from_name'));
        $this->email->to($this->config->item('notice_to'));
        //$this->email->reply_to($data['email']);
        $this->email->subject('test mail to team');
		//$email_body = $this->load->view('inquiry_notification_email', $data, true);
		$this->email->message('test mail');
//attach file here.
        $this->email->send();
        echo $this->email->print_debugger();

        /* ---------------------------------------------
         * send confirmation email to customer.
         * --------------------------------------------- */
/*
        $this->email->clear();

        $this->email->from($this->config->item('confirmation_from'), 
                           $this->config->item('confirmation_from_name'));
        $this->email->to($data['email']);
        $this->email->subject('test mail to customer');
		$email_body = $this->load->view('customer_confirmation_email', $data, true);
		$email_body .= $this->load->view('inquiry_notification_email', $data, true);
		$this->email->message($email_body);
//attach file here.
        $this->email->send();
*/
        /* ---------------------------------------
         * redirect to thank you page.
         * --------------------------------------- */
//        redirect('http://www.kiotoinc.com/form.html?success=1');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
