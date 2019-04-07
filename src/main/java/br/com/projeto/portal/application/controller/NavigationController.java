package br.com.projeto.portal.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author rodrigo
 */
@Controller
public class NavigationController
{
	@Autowired
	private Environment environment;
	/*-------------------------------------------------------------------
	 * 		 					CONTROLLERS
	 *-------------------------------------------------------------------*/

	/**
	 * @return
	 */
	@RequestMapping("/")
	public String home()
	{
		return "projeto/index";
	}

	/**
	 *
	 */
	@RequestMapping(value = "/authentication")
	public ModelAndView authentication()
	{
		return new ModelAndView( "modules/authentication/index" );
	}

	/**
	 * @return
	 */
	@RequestMapping("/incorporation-code")
	public ModelAndView incorporation_code()
	{
		return new ModelAndView( "modules/public/index" );
	}


}
