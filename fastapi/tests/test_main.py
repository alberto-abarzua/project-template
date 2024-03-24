def test_read_main(test_client):
    response = test_client.get("/health/")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
