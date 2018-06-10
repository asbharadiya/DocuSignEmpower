package com.frankmoley.landon.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.docusign.esign.api.*;
import com.docusign.esign.client.*;

import com.docusign.esign.model.*;
import com.docusign.esign.client.auth.OAuth.UserInfo;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value="/docusign")
public class DocumentServiceController {


    static String oauthLoginUrl = "";
    static  String code = "";
    static ApiClient apiClient;


    private static final String publicKeyFilename = "/src/test/keys/docusign_public_key.txt";
    private static final String privateKeyFilename = "/src/test/keys/docusign_private_key.txt";
    private static final String OAuthBaseUrl = "account-d.docusign.com";

    private static final String IntegratorKey = "cd3ed796-79b7-4629-8bd7-f38bc378ad66";
    private static final String UserId = "13eca14d-0ce7-4ac7-ad49-1b331bcb4f5a";
    private static final String RedirectURI = "http://localhost/assignAuth";

    @Autowired
    //private ReservationService reservationService;

    @RequestMapping(method= RequestMethod.GET)
    public String getAllDocuments() throws Exception{
        // return this.reservationService.getRoomReservationsForDate(dateString);
        setKeys();
        return "Hello DocuSign";
    }

    @RequestMapping(method= RequestMethod.GET, value = "/getAllTemplates")
    public EnvelopeTemplateResults getAllTemplatesList() throws Exception{

        return getAllTemplates();
    }

    @RequestMapping(method= RequestMethod.GET, value = "/getRecipients/{templateId}")
    public Recipients getAllTemplatesList(@PathVariable(value="templateId")String templateId) throws Exception{
        return getTemplateRecipients(templateId);
    }

    @RequestMapping(method= RequestMethod.POST, value = "/envelope/{templateId}")
    public ResponseEntity<String> getAllTemplatesList(@PathVariable(value="templateId")String templateId, @RequestBody  TemplateRecipients recipients) throws Exception{

        HttpHeaders responseHeaders = new HttpHeaders();
        Boolean result =  UpdateTemplate(templateId,recipients);
        responseHeaders.set("GetAllTemplates", result+"");
        return new ResponseEntity<>(result+"", responseHeaders, HttpStatus.CREATED);
    }


    @RequestMapping(method= RequestMethod.GET, value = "/getAllEnvelopes")
    public FolderItemsResponse getAllTemplatesListAPI() throws Exception{
        return getAllEnvelopes();
    }


    @RequestMapping(method= RequestMethod.GET, value = "/listAuditEvents/{envelopeId}")
    public EnvelopeAuditEventResponse getListAuditEventsAPI(@PathVariable(value="envelopeId")String envelopeId) throws Exception{
        return getListAuditEvents(envelopeId);
    }



    public static void setKeys() throws Exception{

        String ClientSecret = "c83a5700-5eb0-4e72-bdab-8869eed8b710";
        String AuthServerUrl = "https://account-d.docusign.com";
        String RestApiUrl = "https://demo.docusign.net/restapi";

        apiClient = new ApiClient(AuthServerUrl, "docusignAccessCode", IntegratorKey, ClientSecret);

        // set the base path for REST API requests
        apiClient.setBasePath(RestApiUrl);

        // configure the authorization flow on the api client
        apiClient.configureAuthorizationFlow(IntegratorKey, ClientSecret, RedirectURI);

        // set as default api client in your configuration
        Configuration.setDefaultApiClient(apiClient);

        ///////////////////////////////////////////////////////////////////////////
        // RUN SAMPLES
        ///////////////////////////////////////////////////////////////////////////

        // First request an Authorization Code
        getAuthCode(apiClient);

        System.out.println("Success----");
    }

    ///////////////////////////////////////////////////////////////////////////
    public static void getAuthCode(ApiClient apiClient) throws Exception
    {

        // IMPORTANT NOTE:
        // the first time you ask for a JWT access token, you should grant access by making the following call
        // get DocuSign OAuth authorization url:
        String oauthLoginUrl = apiClient.getJWTUri(IntegratorKey, RedirectURI, OAuthBaseUrl);



        String currentDir = System.getProperty("user.dir");
        apiClient.configureJWTAuthorizationFlow(currentDir + publicKeyFilename, currentDir + privateKeyFilename, OAuthBaseUrl, IntegratorKey, UserId, 3600);
        // now that the API client has an OAuth token, let's use it in all
        // DocuSign APIs
        UserInfo userInfo = apiClient.getUserInfo(apiClient.getAccessToken());


        System.out.println("UserInfo: " + userInfo);

    }



    //GET /v2/accounts/{accountId}/templates
    //https://apiexplorer.docusign.com/#/esign/restapi?categories=Templates&tags=Templates&operations=list
    public static EnvelopeTemplateResults getAllTemplates()throws Exception{
        UserInfo userInfo = apiClient.getUserInfo(apiClient.getAccessToken());
        System.out.println("UserInfo: " + userInfo);
        apiClient.setBasePath(userInfo.getAccounts().get(0).getBaseUri() + "/restapi");
        Configuration.setDefaultApiClient(apiClient);
        String accountId = userInfo.getAccounts().get(0).getAccountId();

        TemplatesApi templateApi = new TemplatesApi();


        return templateApi.listTemplates(accountId);
    }

    //GET /v2/accounts/{accountId}/templates/{templateId}/recipients
    //https://apiexplorer.docusign.com/#/esign/restapi?categories=Templates&tags=TemplateRecipients&operations=list
    public static Recipients getTemplateRecipients(String templateId)throws Exception{
        UserInfo userInfo = apiClient.getUserInfo(apiClient.getAccessToken());
        System.out.println("UserInfo: " + userInfo);
        apiClient.setBasePath(userInfo.getAccounts().get(0).getBaseUri() + "/restapi");
        Configuration.setDefaultApiClient(apiClient);
        String accountId = userInfo.getAccounts().get(0).getAccountId();

        TemplatesApi templateApi = new TemplatesApi();
        return templateApi.get(accountId,templateId).getRecipients();
    }


    public static boolean UpdateTemplate(String templateId, TemplateRecipients recipients){
        try{
            UserInfo userInfo = apiClient.getUserInfo(apiClient.getAccessToken());
            System.out.println("UserInfo: " + userInfo);
            apiClient.setBasePath(userInfo.getAccounts().get(0).getBaseUri() + "/restapi");
            Configuration.setDefaultApiClient(apiClient);
            String accountId = userInfo.getAccounts().get(0).getAccountId();


            TemplatesApi templatesApi =  new TemplatesApi();
            templatesApi.updateRecipients(accountId,templateId,recipients);

            EnvelopeDefinition envDef = new EnvelopeDefinition();
            envDef.setTemplateId(templateId);
            envDef.setStatus("sent");
            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
            EnvelopeSummary envelopeSummary = envelopesApi.createEnvelope(accountId, envDef);
            return true;
        }
        catch(Exception e){return false;}
    }


    public static FolderItemsResponse getAllEnvelopes() {
        try {
            String folderIdOfSent = "dfb30009-c479-41d8-8676-b2c1417c2e82";
            UserInfo userInfo = apiClient.getUserInfo(apiClient.getAccessToken());
            System.out.println("UserInfo: " + userInfo);
            apiClient.setBasePath(userInfo.getAccounts().get(0).getBaseUri() + "/restapi");
            Configuration.setDefaultApiClient(apiClient);
            String accountId = userInfo.getAccounts().get(0).getAccountId();
            FoldersApi foldersApi= new FoldersApi();
            return foldersApi.listItems(accountId,folderIdOfSent);

        }catch (Exception e){return null;}

    }

    public static EnvelopeAuditEventResponse getListAuditEvents(String envelopeId) {
        try {
            String folderIdOfSent = "dfb30009-c479-41d8-8676-b2c1417c2e82";
            UserInfo userInfo = apiClient.getUserInfo(apiClient.getAccessToken());
            System.out.println("UserInfo: " + userInfo);
            apiClient.setBasePath(userInfo.getAccounts().get(0).getBaseUri() + "/restapi");
            Configuration.setDefaultApiClient(apiClient);
            String accountId = userInfo.getAccounts().get(0).getAccountId();
            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);

            return envelopesApi.listAuditEvents(accountId,envelopeId);

        }catch (Exception e){return null;}

    }




}
