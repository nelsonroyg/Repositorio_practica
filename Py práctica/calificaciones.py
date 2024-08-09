
def menu():
    while True:
        print("\nSeleccione una opción")
        print("1: Ingresar puntaje y comentario")
        print("2: Ver puntajes y comentarios")
        print("3: Salir\n")
        opcion = input()
        if opcion == "1":
            ingresar_calificacion()
        elif opcion == "2":
            mostrar_calificacion()
        elif opcion == "3":
            print("Adiós")
            break
        else:
            print("Opción no válida, pruebe nuevamente")

def ingresar_calificacion():
    while True:
        entrada = input("Ingrese puntaje (1-5) y '0' volver al menú: ")
        try:
            puntaje = int(entrada)
        except ValueError:
            print("Por favor, ingresar número válido. Pruebe nuevamente")
    
        if puntaje == 0:
            break
        elif 1 <= puntaje <= 5:
            comentario = input("Ingrese comentario: ")
            guardar_calificacion(puntaje, comentario)
            print("Puntaje y comentario guardados con éxito")
        else:
            print("Por favor, ingresar un número entre 1 y 5")

def guardar_calificacion(puntaje, comentario):
    with open('datos.txt', 'a') as archivo:
        archivo.write(f"Puntaje: {puntaje}, Comentario: {comentario}\n")
        print("\nDatos guardados correctamente")

def mostrar_calificacion():
    try:
        with open('datos.txt', 'r') as archivo:
            contenido = archivo.read()
            if contenido:
                print("Puntajes y comentarios: ")
                for linea in contenido:
                    print(linea.strip())
            else:
                print("No hay datos almacenados")
    except FileNotFoundError:
        print("El archivo no existe")
menu()