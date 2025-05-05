export interface ApiRequest {
    Url: string;                     
    Method: 'GET' | 'POST' | 'PUT' | 'DELETE'; 
    Headers?: Record<string, string>; 
    Params?: Record<string, any>;    
    Data?: any;              
    WithCredentials?: boolean;        
}