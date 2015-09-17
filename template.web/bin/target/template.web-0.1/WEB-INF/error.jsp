<%@ page language="java" pageEncoding="UTF-8" isErrorPage="true" contentType="text/html; charset=UTF-8" %><%org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(getClass());
	String errorCode = request.getParameter("code");
	String message = errorCode;
	if ("400".equals(errorCode)) {
		errorCode = "BAD_REQUEST";
		message = "提交的请求有误, 请检查表单是否填写完整无误";
	} else if ("404".equals(errorCode)) {
		errorCode = "NOT_FOUND";
		String reqUri = (String) request.getAttribute("javax.servlet.forward.request_uri");
		message = "请求的资源[" + reqUri + "]不存在";
	} else if ("405".equals(errorCode)) {
		errorCode = "UNSUPPORTED";
		message = "资源[" + request.getAttribute("javax.servlet.forward.request_uri") + "]不支持HTTP[" + request.getMethod() + "]请求方法";
	} else {
		errorCode = "RUNTIME_EXCEPTION";
		if (exception != null) {
			message = exception.getMessage();
			logger.error(exception.getMessage(), exception);
		}
	}
	logger.error("errorCode: {}, message: {}", errorCode, message);
	response.sendRedirect(com.dumpcache.template.common.demo.utils.UCConstants.PORTAL_URL + "/index.html#/error");%>